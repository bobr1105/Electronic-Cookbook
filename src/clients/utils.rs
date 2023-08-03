pub fn copy_vector<T: Clone>(vec: &Vec<T>) -> Vec<T> {
    let vec = vec.clone();
    vec
}

pub fn redis_key(key_prefix: &str, id: &str) -> String {
    format!("{key_prefix}:{id}")
}
