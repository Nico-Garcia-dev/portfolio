import { NavLink } from "react-router";
import "./mainPage.css";
import { motion } from "framer-motion";

export default function MainPage() {
  return (
    <motion.section
      className="main-page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <h1>Bienvenue sur mon portfolio</h1>
      <p>
        Je suis développeur web et mobile, passionné par la création
        d'interfaces simples, modernes et efficaces. Toujours à l'écoute des
        besoins des utilisateurs, je m'efforce de créer des solutions faciles à
        prendre en main, évolutives et robustes. Curieux des avancées
        technologiques et engagé dans une veille technique régulière, je cherche
        constamment à progresser et à améliorer mes compétences. Le code propre,
        le travail d'équipe et l'apprentissage continu font partie de mes
        priorités au quotidien.
      </p>

      <div className="work-link">
        <div className="arrow" />
        <NavLink className="nav-link" to="/projects">
          Mes projets
        </NavLink>
      </div>
    </motion.section>
  );
}
