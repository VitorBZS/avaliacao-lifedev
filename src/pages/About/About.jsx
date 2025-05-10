import styles from './About.module.css'

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o LifeDev</h2>
      <p>Este projeto consiste em um blog feito com React no front-end e Firebase no back-end.</p>
      <p>O objetivo é criar um blog onde desenvolvedores possam compartilhar seus conhecimentos e experiências.</p>
      <p>Funcionalidades implementadas:</p>
      <ul>
        <li>Autenticação de usuários</li>
        <li>Criação de posts</li>
        <li>Gerenciamento de posts</li>
        <li>Sistema de tags</li>
        <li>Busca por tags</li>
      </ul>
    </div>
  )
}

export default About
