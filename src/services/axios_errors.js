export class AxiosErrors {
  constructor({ request, response, message }) {
    this.error = "";
    this.errorDescription = [];
    this.http_status = "";
    this.http_status_text = "";

    if (response) {
      this.http_status = response.status;
      this.http_status_text = response.statusText;
      this.error = "Response failed";
    } else if (request) {
      this.error = "No Response";
      this.errorDescription.push("No response received for the request");
    } else {
      this.error = `couldn't place a request`;
      this.errorDescription.push(message);
    }
  }
}
export default AxiosErrors;