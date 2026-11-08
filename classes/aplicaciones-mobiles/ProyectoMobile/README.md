# 📱 ProyectoMobile

React Native app for Android that consumes public REST APIs, built for the Mobile Applications course. A home screen links to three API-driven screens: weather, movies and books.

**Stack:** React Native 0.87 · React 19 · TypeScript · React Navigation (native stack) · Axios · Jest

## ✨ What it does

`App.tsx` sets up a native stack navigator (headers hidden) with these screens, all in `pantallas/`:

| Screen | Route | API | What it shows |
|--------|-------|-----|---------------|
| `HomeScreen` | `Home` | — | "Consumiendo APIs" menu with a card per screen |
| `ClimaScreen` | `Clima` | [Open-Meteo](https://open-meteo.com/) | Current temperature and wind speed (fixed coordinates) |
| `PeliculasScreen` | `Peliculas` | [Studio Ghibli API](https://ghibliapi.vercel.app/) | List of films with poster, year, runtime and director |
| `DetallePeliculaScreen` | `DetallePelicula` | (data passed via route params) | Banner, original title, release, director, producer, Rotten Tomatoes score and synopsis |
| `LibrosScreen` | `Libros` | [Open Library](https://openlibrary.org/dev/docs/api/search) | Search books by **title** or **author**, with cover, authors and first publish year |

None of the APIs require an API key.

**Concepts covered:** `@react-navigation/native-stack`, passing params between screens (`navigation.navigate` / `route.params`), `axios` GET with `params`, `useState` + `useEffect`, loading / error / empty states, `FlatList`, `TextInput`, `Image`, `StyleSheet`.

## 🚀 Getting Started

> Requires the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) (Node, JDK, Android Studio) with `ANDROID_HOME` and `JAVA_HOME` set.

```bash
npm install
npm start            # Metro dev server
npm run android      # build and run on an Android emulator/device
npm test             # Jest
```

## ⚠️ Windows notes

- **Long paths:** compiling the native libraries (`react-native-screens`, `react-native-safe-area-context`) fails with `Filename longer than 260 characters` when the project lives in a deeply nested folder. Either move the project to a short path (e.g. `C:\dev\`) or build through a short drive letter: `subst R: "<path-to>\ProyectoMobile"` and run Gradle from `R:\android`.
- **Android 17 emulator:** the first launch asks for *nearby devices* permission (`ACCESS_LOCAL_NETWORK`). If you deny it, the app cannot reach Metro (`Unable to load script`). Fix it with `adb shell pm grant com.proyectomobile android.permission.ACCESS_LOCAL_NETWORK`.
