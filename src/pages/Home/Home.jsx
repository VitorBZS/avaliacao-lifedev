import { useEffect, useState } from 'react'
import { getPosts, searchPostsByTag } from '../../services/firestoreService'
import { useTheme } from '../../contexts/ThemeContext'
import styles from './Home.module.css'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [tag, setTag] = useState("")
  const [searching, setSearching] = useState(false)
  const { theme } = useTheme()

    useEffect(() => {
      const loadPosts = async () => {
        const postsData = await getPosts()
        setPosts(postsData)
      }

      loadPosts()
    }, [])

    const handleSearch = async (e) => {
      e.preventDefault()
      setSearching(true)
    

    if (tag.trim() === '') {
      const allPosts = await getPosts()
      setPosts(allPosts)
    } else {
      const result = await searchPostsByTag(tag.trim().toLowerCase());
      setPosts(result);
    }

    setSearching(false);
  };
  
  return (
    <>
      <h1 className={styles.home_h1}>Veja os posts mais recentes</h1>
      <form className={styles.search_form} onSubmit ={handleSearch}>
          <input 
            type="text"
            placeholder='Ou busque por tags...'
            value={tag}
            onChange={(e) => setTag(e.target.value)} 
          />
          <button className="btn btn-dark" disabled ={searching}>
            {searching ? "Buscando..." : "Pesquisar"}
          </button>
      </form>

      <div className={styles.post_list}>
        {posts.length === 0 ? (
          <p>Nenhum post encontrado.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className={`${styles.post_card} ${theme === 'dark' ? styles.dark : ''}`}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {post.tags && post.tags.length > 0 &&(
                <p><strong>Tags:</strong> {post.tags.join(', ')}</p>
              )}
              <hr />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Home