let i=[];function u(u){i.push(u)}function o(u){i=i.filter((i=>i.$.uid!==u.$.uid))}function c(u){i.forEach((i=>{i.$.uid!==u.$.uid&&i.$.exposed.close()}))}export{c,u as p,o as r};
