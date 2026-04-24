# AstroBookings

Proyecto realizado en **TypeScript** para el curso de Programación con IA.

## Descripción

Este es un proyecto demo de gestión de reservas construido con Astro y TypeScript. Forma parte del material educativo del curso de Programación con IA, donde se exploran las mejores prácticas de desarrollo moderno con herramientas de inteligencia artificial.

## API

### Rockets (`/rockets`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rockets` | List all rockets |
| GET | `/rockets/:id` | Get a rocket by ID |
| POST | `/rockets` | Create a new rocket |
| PUT | `/rockets/:id` | Update a rocket |
| DELETE | `/rockets/:id` | Delete a rocket |

Each rocket has:
- `name` (string, required)
- `range` (`suborbital` | `orbital` | `moon` | `mars`)
- `capacity` (1–10 passengers)

## Repositorio

- **GitHub**: https://github.com/jagarcias1978/astro-bookings-demo

## Autor

**jagarcias1978**

## Licencia

Este proyecto está licenciado bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
