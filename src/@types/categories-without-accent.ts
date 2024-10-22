export type CategoriesParams = {
    category: CategoriesWithoutAccent;
  };
  
  // Tipos de categorias sem acento
  type CategoriesWithoutAccent =
    | 'domesticos'
    | 'eletrico'
    | 'manutencao'
    | 'administracao'
    | 'consultoria'
    | 'contabilidade'
    | 'design'
    | 'engenharia'
    | 'Data Entry'
    | 'Social Media Management'
    | 'juridico'
    | 'marketing'
    | 'saude'
    | 'tecnologia'
    | 'transporte'
    | 'vendas'
    | 'fotografia'
    | 'musica'
    | 'educacao'
    | 'idiomas'
    | 'esportes'
    | 'culinaria'
    | 'beleza'
    | 'moda'
    | 'artesanato';