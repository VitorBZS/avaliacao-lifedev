import { useQuery } from "../../hooks/useQuery"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { Link } from "react-router-dom"
import styles from "./Search.module.css"

const Search = () => {
  const query = useQuery()
  const search = query.get("q")

  const { documents: posts } = useFetchDocuments("posts", search)

  return (
    <div className={styles.search_container}>
      <h2>Resultados da busca: {search}</h2>
      <div className={styles.noposts}>
        {posts && posts.length === 0 && (
          <>
            <p>Não foram encontrados posts a partir da sua busca...</p>
            <Link to="/" className="btn">
              Voltar
            </Link>
          </>
        )}
        {posts && posts.map((post) => (
          <div key={post.id} className={styles.post_card}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className={styles.tags}>
              {post.tagsArray.map((tag) => (
                <p key={tag}>
                  <span>#</span>
                  {tag}
                </p>
              ))}
            </div>
            <Link to={`/posts/${post.id}`} className="btn">
              Ler
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search 