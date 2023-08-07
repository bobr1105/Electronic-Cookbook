pub use std::sync::Arc;

use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::{delete, get, post},
    Json, Router,
};
use axum_macros::debug_handler;
use uuid::Uuid;

use crate::{recipes::Recipe, state_builder::AppState, users::User};
use thiserror::Error;

mod clients;
pub mod recipes;
pub mod redis;
pub mod state_builder;
pub mod users;
pub const ADDRESS: &str = "127.0.0.1:5000";

#[tokio::main]
async fn main() {
    let state = state_builder::build_state().await;

    let app = Router::new()
        .route("/users", get(get_user))
        .route("/recipes", get(list_recipes))
        .route("/recipes/:id", get(get_recipe))
        .route("/recipes", post(create_recipe))
        .route("/recipes/:id", post(update_recipe))
        .route("/recipes/:id", delete(remove_recipe))
        .with_state(state);

    #[debug_handler]
    async fn get_user(State(state): State<Arc<AppState>>) -> Result<Json<User>, Error> {
        let lock = state.users.read().clone();
        let user = lock.get_user().await?;
        Ok(Json(user))
    }

    async fn list_recipes(State(state): State<Arc<AppState>>) -> Result<Json<Vec<Recipe>>, Error> {
        let recipes = state.recipes.list_recipes()?;
        Ok(Json(recipes))
    }

    async fn get_recipe(
        State(state): State<Arc<AppState>>,
        Path(id): Path<Uuid>,
    ) -> Result<Json<Recipe>, Error> {
        let recipe = state.recipes.get_recipe(&id.to_string()).await?;
        Ok(Json(recipe))
    }

    async fn create_recipe(
        State(state): State<Arc<AppState>>,
        Json(body): Json<Recipe>,
    ) -> Result<Json<Uuid>, Error> {
        let recipe_id = state.recipes.update_recipe(None, &body).await?;
        Ok(Json(recipe_id))
    }

    async fn update_recipe(
        State(state): State<Arc<AppState>>,
        Path(id): Path<Uuid>,
        Json(new_recipe): Json<Recipe>,
    ) -> Result<Json<Uuid>, Error> {
        let updated_recipe = state.recipes.update_recipe(Some(id), &new_recipe).await?;
        Ok(Json(updated_recipe))
    }

    async fn remove_recipe(
        State(state): State<Arc<AppState>>,
        Path(id): Path<Uuid>,
    ) -> Result<StatusCode, Error> {
        state.recipes.remove_recipe(&id)?;

        Ok(StatusCode::OK)
    }

    axum::Server::bind(&ADDRESS.parse().unwrap())
        .serve(app.into_make_service())
        .await
        .expect("start webserver");
}

#[derive(Debug, Error)]
pub enum Error {
    #[error(transparent)]
    Anyhow(#[from] anyhow::Error),
    #[error(transparent)]
    SerdeJson(#[from] serde_json::Error),
}

impl IntoResponse for Error {
    fn into_response(self) -> Response {
        StatusCode::INTERNAL_SERVER_ERROR.into_response()
    }
}
