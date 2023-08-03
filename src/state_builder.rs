pub use std::sync::Arc;

use crate::{
    clients::user_client::UserClient,
    recipes::{self},
    redis::RedisRepo,
    users::{self},
};
use parking_lot::RwLock;
use recipes::RecipeManager;
use users::UserManager;

pub struct AppState {
    pub redis_repo: Arc<RedisRepo>,
    pub users: RwLock<Arc<UserManager>>,
    pub recipes: Arc<RecipeManager>,
}
pub async fn build_state() -> Arc<AppState> {
    
    let redis_repo = Arc::new(RedisRepo::init());
    let users = RwLock::new(Arc::new(UserManager::new(Arc::new(UserClient::new()))));
    let recipes = Arc::new(RecipeManager::new(redis_repo.clone()));

    let state = AppState {
        redis_repo: redis_repo.clone(),
        users,
        recipes,
    };

    let state = Arc::new(state);
    return state;
}
