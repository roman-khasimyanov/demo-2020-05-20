type Lazy<T> = T extends Promise<T> ? Promise<T> : T;
export default Lazy;