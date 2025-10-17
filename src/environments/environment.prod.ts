const baseUrl = "http://164.138.22.155";

export const environment = {
  production: true,
  clientIdB:"7868d015-6c79-4da4-b789-8b4d40611946",
  identityPath: `${baseUrl}:5000`,
  technicalPath:`${baseUrl}:5001`,
  customerPath:`${baseUrl}:5002`,
  fileManagerPath:`${baseUrl}:5003`,
  cartablePath:`${baseUrl}:5005`,
  commonPath:`${baseUrl}:5006`,
  financePath:`${baseUrl}:5008`
};

// const baseUrl = "http://81.16.121.176";

//  export const environment = {
//   production: true,
//   clientIdB:"7868d015-6c79-4da4-b789-8b4d40611946",
//   identityPath: `${baseUrl}/NovinMeyar.IdentityServer.Server`,
//   technicalPath:`${baseUrl}/NovinMeyar.Technical.Api`,
//   customerPath:`${baseUrl}/NovinMeyar.Customer.Api`,
//   fileManagerPath:`${baseUrl}/NovinMeyar.FileManagment.Api`,
//   cartablePath:`${baseUrl}/NovinMeyar.Cartabl.Api`,
//   commonPath:`${baseUrl}/NovinMeyar.Common.Api`,
//   financePath:`${baseUrl}/NovinMeyar.Finance.Api`
// };