# encoding: utf-8

require_relative 'app'
require 'json'

def acceder
    RSpec.describe App do
        describe "1. Acceder al sistema: " do
          it '1.1 Conexión con backend-sensores' do
            test =App.new('')
            test.servicios('backend', 'test/conexion')
            expect(test.response.code).to eq(200)
          end
          it '1.2 Acceder' do
              url = 'usuario/acceder?usuario=pips&contrasenia=123'
              test =App.new(url)
              test.post()
              expect(test.response.code).to eq(200)
              expect(test.response.body).to eq(1)
          end
        end
    end
end

acceder
