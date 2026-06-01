# 🔮 Visión Futuro en Tiempo de Crisis

## 📌 Descripción del proyecto

Este proyecto es una **página web educativa e interactiva** desarrollada como parte del desafío final de **Programación Web I**. Simula situaciones reales de crisis económica y desabastecimiento mediante modelos matemáticos sencillos, ayudando a comprender cómo factores como la inflación, la escasez de combustible y la circulación de billetes sin valor legal afectan las decisiones familiares y comunitarias.

**No toma ninguna postura política**, solo busca ofrecer una herramienta didáctica basada en datos y simulación.

## 🚀 Funcionalidades principales

### 1. 📈 Simulador de evolución de precios (canasta básica)
- Lista de productos típicos con **precios base del 25 de mayo de 2026**.
- Permite **simular el paso de las semanas** con cambios aleatorios realistas (subidas de hasta +20%, bajadas de hasta -15% o estabilidad).
- Muestra la **variación porcentual** y una **predicción para la próxima semana** basada en el comportamiento histórico.

**Productos incluidos:**
- Docena de pimientos
- 3 libras de zanahoria
- 3 libras de cebolla verde
- 3 libras de locoto
- 3 libras de vainita
- Unidad de piña

### 2. 🛒 Simulador de compras familiares
- El usuario ingresa su **presupuesto disponible**.
- Selecciona **cantidades de cada producto** (usando los precios actuales).
- El sistema calcula el **total de la compra** e indica si el presupuesto **alcanza o no**, mostrando el saldo restante o el monto faltante.

### 3. ⛽ Simulador de cola en estación de servicio
- Ante la escasez de combustible, el usuario ingresa:
  - Hora de llegada de la **cisterna**.
  - **Modelo de su auto** (compacto → 35L, moderno → 45L, minibús → 60L).
  - **Número total de autos en la fila**.
  - **Su posición en la fila**.
- El sistema calcula si el combustible (1500 litros) alcanza para atender desde el primero hasta su turno, estima la hora de atención y muestra un mensaje claro.

### 4. 💸 Validador de billetes sin valor legal (BCB)
- Basado en los rangos oficiales publicados por el **Banco Central de Bolivia** para billetes de **Bs10, Bs20 y Bs50** que perdieron su curso legal.
- El usuario ingresa la denominación y el número de serie, y el sistema le indica si el billete **es válido** o **no tiene valor legal**.

### 5. 📚 Casos de estudio (ejemplos realistas)
- Se incluyen **cuatro casos de uso diario** (solo texto) para que el usuario comprenda cómo aplicar el simulador:
  - Evolución semanal de precios.
  - Planificación de compras con presupuesto limitado.
  - Fila en la gasolinera (cálculo de alcance).
  - Ejemplo de billete inválido vs válido.

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|------------|------|
| **HTML5** | Estructura semántica (header, nav, main, section, footer, etc.) |
| **CSS3** | Estilos responsivos con **tres paletas de colores** diferenciadas para desktop, tablet y móvil |
| **JavaScript (Vanilla)** | Lógica de simulación, manipulación del DOM, eventos, validaciones y cálculos matemáticos |
| **Git & GitHub** | Control de versiones y alojamiento del código |
| **GitHub Pages / Netlify** | Publicación de la página web (enlace público) |

## 📁 Estructura del proyecto
