import path from 'path';

export default {
  mode: 'development',  // ou 'production', dependendo do seu ambiente
  entry: './server.js',  // Alterado para o caminho correto
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),  // Saída para a pasta 'dist'
  },
};
