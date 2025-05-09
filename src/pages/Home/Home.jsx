import { useEffect, useState } from 'react'
import { getPost } from '../../services/firestoreService'
import styles from './Home.module.css'

const Home = () => {
  const [posts, setPost] = useState([])

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postData = await getPost()
        setPost(postData)
      } catch (error) {
        console.error('Erro ao carregar posts:', error)
      }
    }
    loadPosts()
  }, [])
  
  return (
    <>
    <h1 className={styles.home_h1}>Veja os posts mais recentes</h1>
    <form className={styles.search_form}>
        <input 
        type="text"
        placeholder='Ou busque por tags...' 
        />
        <button className="btn btn-dark">Pesquisar</button>
    </form>

    <div className={styles.post_list}>
      {posts.length === 0 ? (
        <p>Nenhum post encontrado.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className={styles.post_card}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <hr />
          </div>
        ))
      )}
    </div>
    </>
  )
}

export default Home