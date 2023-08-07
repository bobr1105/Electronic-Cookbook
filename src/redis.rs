use anyhow::Result;
use derive_new::new;
use r2d2::Pool;
use redis::{Client, Commands, FromRedisValue, ToRedisArgs};

#[derive(new, Clone)]
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

    pub fn exists<K>(&self, key: &K) -> Result<bool>
    where
        K: ToRedisArgs,
    {
        let exists;

        {
            let mut conn = self.pool.get()?;
            exists = conn.exists(key)?;
        }

        Ok(exists)
    }

    pub fn hash_write<K, F, V>(&self, key: &K, fields: &[(F, V)]) -> Result<()>
    where
        K: ToRedisArgs,
        F: ToRedisArgs,
        V: ToRedisArgs,
    {
        {
            let mut conn = self.pool.get()?;
            conn.hset_multiple(key, fields)?;
        }

        Ok(())
    }

    pub fn hash_field_read<K, F, V>(&self, key: &K, field: &F) -> Result<V>
    where
        K: ToRedisArgs,
        F: ToRedisArgs,
        V: FromRedisValue,
    {
        let value;

        {
            let mut conn = self.pool.get()?;
            value = conn.hget(key, field)?;
        }

        Ok(value)
    }

    pub fn hash_field_remove<K, F>(&self, key: &K, field: &F) -> Result<()>
    where
        K: ToRedisArgs,
        F: ToRedisArgs,
    {
        {
            let mut conn = self.pool.get()?;
            conn.hdel(key, field)?;
        }

        Ok(())
    }

    pub fn hash_read<K, V>(&self, key: &K) -> Result<V>
    where
        K: ToRedisArgs,
        V: FromRedisValue,
    {
        let value;

        {
            let mut conn = self.pool.get()?;
            value = conn.hgetall(key)?;
        }

        Ok(value)
    }

    pub fn hash_values<K, V>(&self, key: &K) -> Result<V>
    where
        K: ToRedisArgs,
        V: FromRedisValue,
    {
        let value;

        {
            let mut conn = self.pool.get()?;
            value = conn.hvals(key)?;
        }

        Ok(value)
    }

    pub fn hash_field_exists<K, F>(&self, key: &K, field: &F) -> Result<bool>
    where
        K: ToRedisArgs,
        F: ToRedisArgs,
    {
        let exists;

        {
            let mut conn = self.pool.get()?;
            exists = conn.hexists(key, field)?;
        }

        Ok(exists)
    }
}
