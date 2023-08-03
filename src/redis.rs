use anyhow::Result;
use derive_new::new;
use r2d2::Pool;
use redis::{Client, Commands, ToRedisArgs, FromRedisValue};

#[derive(new)]
#[derive(Clone)]
pub struct RedisRepo {
    pool: Pool<Client>,
}
impl RedisRepo {
    pub fn init() -> Self {
        let client =
            redis::Client::open("redis://127.0.0.1:6380/").expect("create redis connection");

        let pool = Pool::builder()
            .min_idle(Some(0))
            .max_size(10)
            .build(client)
            .expect("build data pool");

        Self { pool }
    }

    pub fn write<K, V>(&self, key: &K, value: &V) -> Result<()>
    where
        K: ToRedisArgs,
        V: ToRedisArgs,
    {
        {
            let mut conn = self.pool.get()?;
            conn.set(key, value)?;
        }

        Ok(())
    }

    pub fn read<K, V>(&self, key: &K) -> Result<V>
    where
        K: ToRedisArgs,
        V: FromRedisValue,
    {
        let value;

        {
            let mut conn = self.pool.get()?;
            value = conn.get(key)?;
        }

        Ok(value)
    }
}
