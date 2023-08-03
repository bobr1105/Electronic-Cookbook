use anyhow::Result;
use derive_new::new;

use crate::users::User;

#[derive(new)]
pub struct UserClient {
}

impl UserClient {
    pub async fn get_user(&self) -> Result<User> {
        //Some API CALL
        let user = User {
            id: 1,
            name: String::from("Scurtu"),
        };
        Ok(user)
    }
}
