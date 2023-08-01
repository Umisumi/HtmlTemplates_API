import mongoose from "mongoose";

const htmlTemplateSchema = (
    {
        name: {
            type: String,
            require: true
        },
        html_code: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        }
    }
)

const HtmlTemplate = mongoose.model("html_template", htmlTemplateSchema);

export default HtmlTemplate;


