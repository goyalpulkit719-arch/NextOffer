import axios from "axios";

const downloadPdf = async (fileUrl) => {

    const response = await axios.get(fileUrl, {
        responseType: "arraybuffer",
    });

    return Buffer.from(response.data);

}
    
export default downloadPdf;