// import axios from "axios";

// interface LocationData {
//   latitude: number;
//   longitude: number;
//   ld: number;
//   le: number;
//   ln: number;
//   lden: number;
//   nombre: string;
// }
// const database_url =
//
// const client = new Client({
//   connectionString: database_url,
// });

// // Función para obtener los datos de ubicación desde la base de datos
// async function fetchLocationDataFromDatabase(): Promise<LocationData[]> {
//   try {
//     await client.connect(); // Conecta con la base de datos

//     const result = await client.query<LocationData>(
//       "SELECT * FROM public.ruido"
//     ); // Reemplaza 'nombre_de_tu_tabla' con el nombre real de tu tabla

//     return result.rows; // Devuelve los datos obtenidos de la consulta
//   } catch (error) {
//     console.error(
//       "Error al obtener los datos de ubicación desde la base de datos:",
//       error
//     );
//     return [];
//   } finally {
//     await client.end();
//   }
// }

// async function fetchLocationDataFromHTTP(): Promise<LocationData[]> {
//   const database_url =
//     "postgresql://user:4Vi7LuCWSalh@ep-shiny-union-a2ewbwt8.eu-central-1.aws.neon.tech/zbeLCG?sslmode=require";
//   try {
//     const response = await axios.get<LocationData[]>(database_url);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error al obtener los datos de ubicación a través de HTTP:",
//       error
//     );
//     return [];
//   }
// }

// function transformDataToDesiredFormat(data: LocationData[]): any[] {
//   return data.map((location) => [
//     location.latitude,
//     location.longitude,
//     location.ld,
//     location.le,
//     location.ln,
//     location.lden,
//     location.nombre,
//   ]);
// }

// export async function fetchDataAndTransform(): Promise<void> {
//   const locationDataFromDatabase = await fetchLocationDataFromDatabase();

//   const locationDataFromHTTP = await fetchLocationDataFromHTTP();

//   const transformedData = transformDataToDesiredFormat([
//     ...locationDataFromDatabase,
//     ...locationDataFromHTTP,
//   ]);

//   console.log("Datos transformados:", transformedData);
// }

// fetchDataAndTransform();
