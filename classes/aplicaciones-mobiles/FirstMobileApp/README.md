# 📱 FirstMobileApp

First React Native app of the Mobile Applications course: a basic user form that validates its fields before showing the captured data.

**Stack:** React Native 0.87 · React 19 · TypeScript · Jest

## ✨ What it does

`App.tsx` renders a `FormularioUsuario` screen with four inputs:

| Field | Keyboard |
|-------|----------|
| Nombre | default |
| Apellido | default |
| Teléfono | phone-pad |
| DPI | phone-pad |

Pressing **Enviar** shows an `Alert`: an error if any field is empty, otherwise a summary of the entered data.

**Concepts covered:** `useState`, `TextInput`, `Button`, `Alert`, `ScrollView`, `StyleSheet`.

## 🚀 Getting Started

> Requires the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) (Node, JDK, Android Studio).

```bash
npm install
npm start            # Metro dev server
npm run android      # build and run on an Android emulator/device
npm test             # Jest
```

See also [FormularioEmpleado](../FormularioEmpleado/), the evolved version of this form.
