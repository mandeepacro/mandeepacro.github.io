const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const projectPageTemlpate = path.resolve(`src/templates/ProjectTemplate.js`)

    const result = await graphql(`
    query {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/src/content/projects/" }}
        ) {
          nodes {
            frontmatter {
              id
            }
          }
        }
      }
    `);
  
    if (result.errors) {
      throw result.errors;
    }
  
    const projects = result.data.allMarkdownRemark.nodes;
  
    projects.forEach(project => {
      const id = project.frontmatter.id;
  
      createPage({
        path: `/project/${id}`,
        component: projectPageTemlpate,
        context: {
            id
        }
      });
    });
  };
  