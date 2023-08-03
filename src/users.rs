use std::sync::Arc;

use anyhow::Result;
use derive_new::new;
use serde::{Deserialize, Serialize};

use crate::clients::user_client::UserClient;
#[derive(new)]
pub struct UserManager {
    client: Arc<UserClient>,
}

impl UserManager {
    pub async fn get_user(&self) -> Result<User> {
        let user = self.client.get_user().await?;
        Ok(user)
    }
}

#[derive(Serialize, Deserialize, Clone)]
pub struct User {
    pub id: i32,
    pub name: String,
}
