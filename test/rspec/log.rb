# encoding: utf-8

require_relative 'app'
require 'json'

def crear_log
  RSpec.describe App do
      describe "1. Crear log: " do
        it '1.1 Conexión con backend' do
          test =App.new('')
          test.servicios('backend', 'test/conexion')
          expect(test.response.code).to eq(200)
        end
        it '1.2 Crear' do
            url = 'log/crear/5a764b813466aa4800000000'
            test =App.new(url)
            test.post()
            expect(test.response.code).to eq(200)
            expect(test.response.body).to eq('Se ha creado una entrada de log al usuario')
        end
      end
  end
end

crear_log