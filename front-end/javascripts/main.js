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

const APP = document.querySelector('#js-app');
const apiUrl = 'http://localhost:4000/graphql';

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

const render = (items) => {
  APP.innerHTML = items.map((item) => {
    const html = `
      <rh-card class="dx-col-12 sm:dx-col-6 lg:dx-col-4">
        <h2 slot="header">${item.title}</h2>
        <p class="dx-m-0">${item.description}</p>
        <rh-cta slot="footer">
          <a href="${item.url}">${item.featureImageAlt}</a>
        </rh-cta>
      </rh-card>
    `;
    return html;
  }).join('');
};

const init = async () => {
  try {
    const data = await fetchGraphQLData(apiUrl, query);
    console.log(data.card);

    // Render metadata info:
    document.querySelector('#js-metadata').innerText = `${data.card[0].metadata.type} - ${data.card[0].metadata.numberOfLearningResources} resources - ${data.card[0].metadata.timeToComplete} - ${data.card[0].metadata.datePublished}`;

    // Render cards:
    render(data.card);
  } catch (error) {
    document.querySelector('#js-app').textContent = `Error: ${error.message}`;
  }
};

init();
