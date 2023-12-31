use std::{collections::HashMap, sync::Arc};

use anyhow::Result;
use derive_new::new;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::redis::RedisRepo;

pub const PREFIX: &str = "recipe";

#[derive(new)]
pub struct RecipeManager {
    redis_repo: Arc<RedisRepo>,
}

impl RecipeManager {
    pub fn list_recipes(&self) -> Result<Vec<Recipe>> {
        let mut collections = Vec::new();

        if self.redis_repo.exists(&PREFIX)? {
            let hash: HashMap<String, String> = self.redis_repo.hash_read(&PREFIX)?;

            let mut parsed = Vec::with_capacity(hash.len());

            for value in hash.into_values() {
                let collection = serde_json::from_str(&value)?;
                parsed.push(collection)
            }

            collections.append(&mut parsed)
        }

        Ok(collections)
    }

    pub async fn get_recipe(&self, id: &str) -> Result<Recipe> {
        let field = id.to_string();

        let value: String = self.redis_repo.hash_field_read(&PREFIX, &field)?;

        let recipe = serde_json::from_str(&value)?;

        Ok(recipe)
    }

    pub async fn set_recipe(&self, recipe: &Recipe) -> Result<Uuid> {
        self.save_recipe(&recipe).await?;
        Ok(recipe.id)
    }

    pub async fn save_recipe(&self, recipe: &Recipe) -> Result<()> {
        dbg!(&recipe);
        let field = recipe.id.to_string();

        let value = serde_json::to_string(&recipe)?;

        self.redis_repo.hash_write(&PREFIX, &[(field, &value)])?;

        Ok(())
    }

    pub fn remove_recipe(&self, id: &Uuid) -> Result<()> {
        let field = id.to_string();

        self.redis_repo.hash_field_remove(&PREFIX, &field)?;

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
#[derive(new, Debug, Serialize, Deserialize, Clone)]
pub struct Recipe {
    #[serde(default = "Uuid::new_v4")]
    pub id: Uuid,
    pub image: String,
    pub title: String,
    pub description: String,
    pub meal_category: MealCategory,
    pub ingredients: Vec<String>,
    pub preparation_steps: Vec<String>,
}
#[derive(new, Debug, Serialize, Deserialize, Clone)]
pub enum MealCategory {
    Breakfast,
    Lunch,
    Dinner,
}
