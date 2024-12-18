// Helper function to fetch JSON file from the server
const loadJSON = async (fileName) => {
  try {
    const response = await fetch(`json/${fileName}.json`);
    if (!response.ok) throw new Error('Failed to load JSON');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Helper function to populate HTML content
const populateContent = (data) => {
  // Title of the page
  const pageTitle = document.querySelector("title").textContent;

  // Depending on the page's title, use the appropriate data structure
  if (pageTitle === "Glossario delle Socket") {
    // Populate glossary
    const glossaryContainer = document.getElementById("glossario-content");
    data.forEach(term => {
      const termElement = document.createElement('dl');
      termElement.classList.add("row");

      const termDefinition = `
        <dt class="col-sm-3">${term.term}</dt>
        <dd class="col-sm-9">${term.definition}</dd>
      `;

      termElement.innerHTML = termDefinition;
      glossaryContainer.appendChild(termElement);
    });
  } else if (pageTitle === "TCP vs UDP") {
    // Populate TCP vs UDP page
    const tcpUdpContainer = document.getElementById("tcp-udp-content");
    const content = `
      <h1>${data.title}</h1>
      <p class="lead">${data.introduction}</p>
      <div>
        <h2>Cos'è TCP?</h2>
        <p>${data.tcp.description}</p>
        <h2>Cos'è UDP?</h2>
        <p>${data.udp.description}</p>
        <h3>Principali differenze</h3>
        <table class="table table-bordered">x
          <thead>
            <tr>
              <th>Caratteristica</th>
              <th>TCP</th>
              <th>UDP</th>
            </tr>
          </thead>
          <tbody>
            ${data.differences.map(diff => `
              <tr>
                <td>${diff.feature}</td>
                <td>${diff.tcp}</td>
                <td>${diff.udp}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    tcpUdpContainer.innerHTML = content;
  }
};

// Load the corresponding JSON data based on page title
const loadPageContent = async () => {
  const pageTitle = document.querySelector("title").textContent.toLowerCase().replace(/ /g, "_");

  const jsonData = await loadJSON(pageTitle);
  if (jsonData) {
    populateContent(jsonData);
  }
};

// Call the function to load content when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadPageContent();
});
