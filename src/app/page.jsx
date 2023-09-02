import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Link from 'next/link'

export default function Home() {

  // ! Indicamos la carpeta de los blogs
  const blogDir = "src/blogs"

  // ! Buscamos todos los archivos en la carpeta blogs
  const files = fs.readdirSync(path.join(blogDir))

  // ! Para cada blog encontrado
  const blogs = files.map(filename => {

    // * Leemos el contenido del blog
    const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf-8')

    // * Extraemos la metadata del contenido del blog
    const { data: frontMatter } = matter(fileContent)

    // ! Regresamos la metadata y el slug de la pagina
    return {
      meta: frontMatter,
      slug: filename.replace('.mdx', '')
    }
  })

  return (
    <main className="flex flex-col">
      <h1 className="text-3xl font-bold">
        Elite as Dev 👨🏽‍🚀🚀✨
      </h1>


      <section className='py-10'>
        <h2 className='text-2xl font-bold'>
          Ultimos Blogs
        </h2>

        <div className='py-2'>
          {blogs.map(blog => (
            <Link href={'/blog/' + blog.slug} passHref key={blog.slug}>
              <div className='py-2 flex justify-between align-middle gap-2'>
                  <div>
                      <h3 className="text-lg font-bold">{blog.meta.title}</h3>
                      <p className="text-gray-400">{blog.meta.description}</p>
                  </div>
                  <div className="my-auto text-gray-400">
                      <p>{blog.meta.date}</p>
                  </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
