CREATE DATABASE patas;

USE patas;

CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL,
  criado_em timestamp NOT NULL DEFAULT current_timestamp,
  data_registro TEXT,
  PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE colaboradores (
  id INT(11) NOT NULL AUTO_INCREMENT,
  recusaram TEXT,
  problemas TEXT,
  bons TEXT,
  neutros TEXT,
  flag TEXT,
  fullname VARCHAR(100),
  criado_em timestamp NOT NULL DEFAULT current_timestamp,
  data_registro TEXT,
  user_id INT(11),
  PRIMARY KEY (id),
  FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE coleta (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nome_local TEXT,
  dia_coleta INT(11),
  mes_coleta INT(11),
  ano_coleta INT(11),
  item TEXT,
  quantidade INT(11),
  flag TEXT,
  fullname VARCHAR(100),
  criado_em timestamp NOT NULL DEFAULT current_timestamp,
  data_registro TEXT,
  user_id INT(11),
  PRIMARY KEY (id),
  FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE estoque (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nome TEXT,
  item TEXT,
  q_recebida INT(11),
  q_devolvida INT(11),
  flag TEXT,
  obs TEXT,
  fullname VARCHAR(100),
  criado_em timestamp NOT NULL DEFAULT current_timestamp,
  data_registro TEXT,
  user_id INT(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE eventos (
  id INT(11) NOT NULL AUTO_INCREMENT,
  dia INT(11),
  mes INT(11),
  ano INT(11),
  evento TEXT,
  responsavel TEXT,
  agenda INT(11),
  calendario INT(11),
  a_vendida INT(11),
  c_vendido INT(11),
  total NUMERIC(19,4),
  obs TEXT,
  flag TEXT,
  fullname VARCHAR(100),
  criado_em timestamp NOT NULL DEFAULT current_timestamp,
  data_registro TEXT,
  user_id INT(11),
  PRIMARY KEY (id),
  FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE vendas (
  id INT(11) NOT NULL AUTO_INCREMENT,
  local TEXT,
  endereco TEXT,
  contato TEXT,
  leva TEXT,
  v_responsavel TEXT,
  agendas INT(11),
  calendarios INT(11),
  totais NUMERIC(19,4),
  pago NUMERIC(19,4),
  pagar NUMERIC(19,4),
  observacao TEXT,
  flag TEXT,
  fullname VARCHAR(100),
  criado_em timestamp NOT NULL DEFAULT current_timestamp,
  data_registro TEXT,
  user_id INT(11),
  PRIMARY KEY (id),
  FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE preco (
  id INT(11) NOT NULL AUTO_INCREMENT,
  p_agenda NUMERIC(19,4),
  p_calendario NUMERIC(19,4),
  eventos_id INT(11),
  vendas_id INT(11),
  PRIMARY KEY (id),
  FOREIGN KEY(eventos_id) REFERENCES eventos(id) ON UPDATE CASCADE,
  FOREIGN KEY(vendas_id) REFERENCES vendas(id) ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE soma_vendas (
  id INT(11) NOT NULL AUTO_INCREMENT,
  s_agendas INT(11),
  s_calendarios INT(11),
  s_totais NUMERIC(19,4),
  s_pago NUMERIC(19,4),
  s_pagar NUMERIC(19,4),
  vendas_id INT(11),
  PRIMARY KEY(id),
  FOREIGN KEY(vendas_id) REFERENCES vendas(id) ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE soma_eventos (
  id INT(11) NOT NULL AUTO_INCREMENT,
  s_a_vendida INT(11),
  s_c_vendido INT(11),
  s_total NUMERIC(19,4),
  eventos_id INT(11),
  PRIMARY KEY(id),
  FOREIGN KEY(eventos_id) REFERENCES eventos(id) ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;