import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "bubble",
          },
        },
        modes: {
          bubble: {
            size: 4,
            distance: 100,
            duration: 2,
            opacity: 0.8,
          },
        },
      },
      particles: {
        color: {
          value: "#FACC15",
        },
        links: {
          color: "#FACC15",
          distance: 100,
          enable: true,
          opacity: 0.15,
          width: 0.5,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 1.2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 180,
        },
        opacity: {
          value: { min: 0.3, max: 0.6 },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3.5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="fixed inset-0 z-0"
    />
  );
}
