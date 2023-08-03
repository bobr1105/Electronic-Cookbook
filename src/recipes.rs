use std::sync::Arc;

use anyhow::Result;
use derive_new::new;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{
    clients::utils::{self, redis_key},
    redis::RedisRepo,
};

pub const PREFIX: &str = "recipe";

#[derive(new)]
pub struct RecipeManager {
    redis_repo: Arc<RedisRepo>,
}

impl RecipeManager {
    pub async fn get_recipe(&self, id: &str) -> Result<Recipe> {
        let key = redis_key(PREFIX, &id);
        let value: String = self.redis_repo.read(&key)?;
        let recipe = serde_json::from_str(&value)?;
        Ok(recipe)
    }

    pub async fn update_recipe(&self, id: Option<Uuid>, new_recipe: &Recipe) -> Result<Uuid> {
        let updated = Recipe {
            id: self.set_id(id),
            meal_category: new_recipe.meal_category.clone(),
            ingredients: utils::copy_vector(&new_recipe.ingredients),
            preparation_steps: utils::copy_vector(&new_recipe.preparation_steps),
        };
        self.save_recipe(&updated).await?;
        Ok(updated.id)
    }

    pub async fn save_recipe(&self, recipe: &Recipe) -> Result<()> {
        let key = redis_key(PREFIX, &recipe.id.to_string());
        let value = &serde_json::to_string(&recipe)?;
        self.redis_repo.write(&key, &value)?;
        Ok(())
    }

    pub fn set_id(&self, id: Option<Uuid>) -> Uuid {
        if let Some(id) = id {
            id
        } else {
            Uuid::new_v4()
        }
    }
}
#[derive(new, Serialize, Deserialize, Clone)]
pub struct Recipe {
    #[serde(skip)]
    pub id: Uuid,
    pub meal_category: MealCategory,
    pub ingredients: Vec<String>,
    pub preparation_steps: Vec<String>,
}
#[derive(new, Serialize, Deserialize, Clone)]
pub enum MealCategory {
    Breakfast,
    Lunch,
    Dinner,
}
