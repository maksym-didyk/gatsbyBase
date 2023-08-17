/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query posts {
      allMarkdownRemark {
        nodes {
          frontmatter {
            category
            url
          }
        }
      }
    }
  `)

  data.allMarkdownRemark.nodes.forEach(node => {
    const { url, category } = node.frontmatter;

    const { createPage } = actions;
    createPage({
      path: `/${category}/${url}`,
      component: require.resolve("./src/templates/single-post.tsx"),
      context: {
        url,
        category,
      },
      defer: true,
    })
  })


  // const { createPage } = actions
  // createPage({
  //   path: "/using-dsg",
  //   component: require.resolve("./src/templates/using-dsg.js"),
  //   context: {},
  //   defer: true,
  // })
}
