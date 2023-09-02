import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remarkGfm from 'remark-gfm'

import { MDXRemote } from 'next-mdx-remote/rsc'

const options = {
  mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
  }
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('src/blogs'))

  const paths = files.map(filename => ({
      slug: filename.replace('.mdx', '')
  }))

  return paths
}

export async function generateMetadata({ params }) {
  const blog = getPost(params);

  return{
      title: blog.frontMatter.title,
      description: blog.frontMatter.description,
  }
}

function getPost({slug}){
  const markdownFile = fs.readFileSync(path.join('src/blogs',slug + '.mdx'), 'utf-8')

  const { data: frontMatter, content } = matter(markdownFile)

  return {
      frontMatter,
      slug,
      content
  }
}

export default function Post({ params } ) {
  const props = getPost(params);

  return (
      <article className='prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto'>
          <h1>{props.frontMatter.title}</h1>
          
          {/* @ts-expect-error Server Component*/}
          <MDXRemote source={props.content} options={options}/>
      </article>
  )
}