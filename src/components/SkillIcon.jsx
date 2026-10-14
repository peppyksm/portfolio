import { FaJava } from 'react-icons/fa6'
import { SiSpring, SiApachetomcat, SiJson, SiReact, SiGit, SiApachemaven } from 'react-icons/si'
import { RiOpenaiFill } from 'react-icons/ri'
import { TbDatabase, TbDatabaseCog, TbFileCode, TbSql } from 'react-icons/tb'

const icons = {
  'Java 17': FaJava,
  'Spring MVC': SiSpring,
  'Tomcat 9': SiApachetomcat,
  Oracle: TbDatabase,
  MyBatis: TbDatabaseCog,
  SQL: TbSql,
  'OpenAI API': RiOpenaiFill,
  'JSON Schema': SiJson,
  React: SiReact,
  JSP: TbFileCode,
  Git: SiGit,
  Maven: SiApachemaven,
}

export default function SkillIcon({ name }) {
  const Icon = icons[name] ?? TbFileCode
  return <Icon className="skill-icon" aria-hidden="true" focusable="false" />
}
