export interface sequelizeOptions {
  attributes?: string[];
  where?: {
    [key: string]: any;
  };
  include?: any[];
}
