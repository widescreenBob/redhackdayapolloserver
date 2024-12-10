const query = `
  query FrontEnd {
    card {
      title
      description
      url
      featureImageUrl
      featureImageAlt
      metadata {
        datePublished
        numberOfLearningResources
        timeToComplete
        type
      }
    }
  }
`;

const fetchGraphQLData = async (url, query) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const responseData = await response.json();

    if (!response.ok || Object.hasOwn(responseData, 'errors')) {
      throw new Error(
        `GraphQL Error: ${
          responseData.errors ? JSON.stringify(responseData.errors, null, 2) : 'Unknown error'
        }`
      );
    }

    return responseData.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch GraphQL data');
  }
};

const main = async () => {
  const apiUrl = 'http://localhost:4000/graphql';
  try {
    const data = await fetchGraphQLData(apiUrl, query);

    const { description, featureImageAlt, featureImageUrl, metadata, title, url } = data.card;
    const { type, datePublished, numberOfLearningResources, timeToComplete } = metadata;

    document.querySelector('#metadata').innerText = `${type} - ${numberOfLearningResources} resources - ${timeToComplete} - ${datePublished}`;

    // Just a demo, nevermind `innerHTML` here ;-)
    document.querySelector('#app').innerHTML = `
      <div class="graphql-content" style="max-width: 800px;"">
        <rh-card>
          <h2 slot="header">${title}</h2>
          <p class="dx-m-0">${description}</p>
          <rh-cta slot="footer">
            <a href="${url}">${featureImageAlt}</a>
          </rh-cta>
        </rh-card>
      </div>
    `;
  } catch (error) {
    document.getElementById('app').textContent = `Error: ${error.message}`;
  }
};

main();
