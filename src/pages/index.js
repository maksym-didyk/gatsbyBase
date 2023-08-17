import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const samplePageLinks = [
  {
    text: "Page 2",
    url: "page-2",
    badge: false,
    description:
      "A simple example of linking to another page within a Gatsby site",
  },
  { text: "TypeScript", url: "using-typescript" },
  { text: "Server Side Rendering", url: "using-ssr" },
]

const IndexPage = ({ data }) => {
  const { nodes } = data.allMarkdownRemark;
  const visiblePosts = nodes.sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));

  console.log('Props:', nodes);

  return (
  <Layout>
    <div className="posts">
      {visiblePosts.map(post => {
        const {category, title, url, image } = post.frontmatter;
        const img = getImage(image);

        return (
          <div key={post.id} className="posts__post">
            <GatsbyImage image={img} alt={title} />
            {' '}
            <Link to={`/${category}/${url}`}>
              {title}
            </Link>
          </div>
        )
      })}
    </div>
    <hr />
    <div className={styles.textCenter}>
      <StaticImage
        src="../images/example.png"
        loading="eager"
        width={64}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt=""
        style={{ marginBottom: `var(--space-3)` }}
      />
      <h1>
        Welcome to <b>Gatsby!</b>
      </h1>
      <p className={styles.intro}>
        <b>Example pages:</b>{" "}
        {samplePageLinks.map((link, i) => (
          <React.Fragment key={link.url}>
            <Link to={link.url}>{link.text}</Link>
            {i !== samplePageLinks.length - 1 && <> · </>}
          </React.Fragment>
        ))}
        <br />
        Edit <code>src/pages/index.js</code> to update this page.
      </p>
    </div>
  </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" description={undefined} children={undefined} />

export default IndexPage

export const query = graphql`
  query MainPage {
    allMarkdownRemark {
      nodes {
        frontmatter {
          category
          title
          url
          image {
            childImageSharp {
              gatsbyImageData(width: 200, placeholder: BLURRED, formats: [AUTO, AVIF])
            }
          }
        }
        id
      }
    }
  }
`
