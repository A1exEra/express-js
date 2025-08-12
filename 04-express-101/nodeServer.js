const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("A request was made: ________", req.url);
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    const homePage = fs.readFileSync("./node.html");
    res.write(homePage);
    res.end();
  } else if (req.url === "/express.png") {
    res.writeHead(200, { "content-type": "image/png" });
    const image = fs.readFileSync("./express.png");
    res.write(image);
    res.end();
  } else if (req.url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    const styles = fs.readFileSync("./styles.css");
    res.write(styles);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Page Not Found</h1>");
    res.end();
  }
});
server.listen("3000");
