import { Component } from "react";

/**
 * Sin esto, un error de render en cualquier parte del árbol hace que React desmonte TODO
 * (vuelve a <div id="root"></div> vacío) sin dejar ningún rastro visible — así se vio la
 * pantalla en blanco que reportó el usuario. Con este boundary, el error se muestra en
 * pantalla (mensaje + stack) en vez de desaparecer todo en silencio, y además queda logueado
 * en la consola con más contexto del que da el navegador solo.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary] Uncaught render error:", error, info?.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: "100vh",
            background: "#16130d",
            color: "#e9e1d7",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            textAlign: "center",
            fontFamily: "monospace",
          }}
        >
          <h1 style={{ color: "#ff6b6b", marginBottom: 12 }}>Se rompió algo al cargar la página</h1>
          <p style={{ maxWidth: 640, marginBottom: 16 }}>
            {this.state.error?.message || String(this.state.error)}
          </p>
          <pre
            style={{
              maxWidth: "90vw",
              overflow: "auto",
              background: "#0a0a0f",
              padding: 16,
              borderRadius: 8,
              fontSize: 11,
              textAlign: "left",
            }}
          >
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 20,
              padding: "10px 24px",
              borderRadius: 8,
              background: "#e6c364",
              color: "#3d2e00",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Recargar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
