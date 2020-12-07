const config = require("./configuration/VueConfiguration.json");
const path = require('path');
module.exports = {

  baseUrl:
  process.env.NODE_ENV === config.NodeEnvironment
    ? config.ProductionURL
    : config.DevelopmentURL,
    outputDir:
    process.env.NODE_ENV === config.NodeEnvironment
      ? path.resolve(__dirname, config.ProdutionOutputPath)
      : path.resolve(__dirname, config.DevelopmentOutputPath),
      chainWebpack: webapckConfig => {
        webapckConfig.plugin("html").tap(() => {
          if (process.env.NODE_ENV == config.ProductionEnvironment) {
            return [
              {
                inject: true,
                filename: "../Views/Shared/_Layout.cshtml",
                template: "../../Views/Shared/_Layout_Template.cshtml"
              }
            ];
          } else {
            return [
              {
                inject: true,
                filename: "index.html",
                template: "./public/index.html"
              }
            ];
          }
        });
      },
    configureWebpack: {
      output: {         
        filename: 'MinuteMaids.min.js',
        libraryTarget: 'window'
      },
      
   
      module: {
        rules: [
          {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 50000
                }
              }
            ]
          }
        ]
      },
      resolve: {
        alias: {
            vue$: 'vue/dist/vue.js'
        }
      }
    }
  }