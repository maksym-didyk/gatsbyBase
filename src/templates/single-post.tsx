import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const SinglePost = ({ data }) => {
    const { html } = data.markdownRemark;
    const { title, category, image } = data.markdownRemark.frontmatter;
    const img = getImage(image) as any;

    return (
        <Layout>
            <Seo title={title} description={title} children={undefined} />
            <div>
                <Link to="/">Go Back</Link>
                <div>
                    <h1>{title}</h1>
                    <p>{category}</p>
                </div>
                
                <div>
                    <GatsbyImage image={img} alt={title} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: html }} />                
            </div>
        </Layout>
    )  
}

// export const Head = () => <Seo title={undefined} description={undefined} children={undefined} />

export default SinglePost

export const query = graphql`
query PostQuery($url: String) {
    markdownRemark(frontmatter: {url: {eq: $url}}) {
      html
      frontmatter {
        title
        url
        category
        image {
          childImageSharp {
            gatsbyImageData(width: 600)
          }
        }
      }
    }
  }
  `
