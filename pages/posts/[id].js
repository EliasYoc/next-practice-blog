import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// los console log de getStatic... se ejecuta en terminal
export async function getStaticPaths() {
  const paths = getAllPostIds(); //obtengo el arrary ids
  // [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]

  //si uso pages/posts/[...id].js ,que coincide con posts/a o /posts/a/b
  //pero debo returnar un array asi:
  // [ {params: {id: ['a', 'b', 'c']} } //...]
  // Statically Generates /posts/a/b/c

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  //desestructura el array de getStaticPaths
  //console.log(params); //{id:"ssg-ssr"}
  const postData = await getPostData(params.id);
  return {
    //devuelve las props al Componente Post
    props: {
      postData,
    },
  };
}
