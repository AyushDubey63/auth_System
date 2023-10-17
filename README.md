###
create a config.js in server and add these lines
export default {
    JWT_SECRET : "Your jwt key ",
    EMAIL: "Your ethereal email id you'll recceive from the ethereal",
    PASSWORD: "your ethereal password"
}
###
i have used monoMemoryServer so it get created and deleted at every start when we run the project so 
if you want to connect you can connect it in conn.js ny adding your own mongoDB connection string in above code as 
const db = await mongooose.connect(ENV.ATLAS_URI)
and add ATLAS_URI: "your atlas connection string with username and password" 