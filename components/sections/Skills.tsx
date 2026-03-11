// components/sections/Skills.tsx
import { skillCategories } from "@/content/experience";

export default function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">What I Know</span>
          <h2 className="section-title">
            Technical <span className="highlight">Skills</span>
          </h2>
        </div>
        <div className="skills-grid">
          {skillCategories.map((category) => (
            <div key={category.name} className="skill-category">
              <div className="category-header">
                <div className="category-icon">
                  <i className={category.icon}></i>
                </div>
                <h3>{category.name}</h3>
              </div>
              <div className="skill-tags">
                {category.skills.map((skill) => (
                  <span key={skill.name} className="skill-tag">
                    {skill.icon && <i className={skill.icon}></i>}{" "}
                    {skill.name === "Hugging Face"
                      ? `\u{1F917} ${skill.name}`
                      : skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
