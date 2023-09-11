export const Constants = {
  "email_regexp": "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
  "number_regexp": /^\d+$/,
  "phonenumber_regexp": "^[+]?[0-9]{1,3}[-\s]?[(]?[0-9]{1,4}[)]?[-\s]?[0-9]{1,4}[-\s]?[0-9]{1,9}$",
  "hostname_regexp": /^[a-z0-9-.]+$|^$/,
  "https_regexp": /^https:\/\/([a-z0-9-]+)\.(.*)$|^$/,
  "uuid_regexp": /^([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/
}