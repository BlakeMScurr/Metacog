export async function post({ query }) {
    let challenger = query.get("challenger")
    let accepter = query.get("accepter")
    return {
        body: {}
    }
}