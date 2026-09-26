import Link from "next/link";
import GradientButton from "@/components/ui/gradient-button";
import { CyberBook } from "@/components/icons/cyber-icons";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative z-10 mt-auto w-full border-t border-white/5 bg-[#080808] px-4 text-white/50"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col py-14 md:py-16">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-center lg:gap-0">
          <div className="flex max-w-md flex-col gap-4">
            <h4 className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-primary"></span>
              Join NEAR!
            </h4>
            <p className="font-body text-xs font-medium leading-relaxed">
              Are you building the open web? Deploy your project on NEAR and
              join the ecosystem's premier index.
            </p>
            <div className="mt-2">
              <a
                href="https://submit.nearcatalog.xyz"
                target="_blank"
                rel="noreferrer"
                className="secondary-btn inline-block"
              >
                SUBMIT PROJECT
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-7 lg:items-end">
            <div className="cyber-mono flex flex-col items-start gap-4 text-[10px] uppercase tracking-widest md:flex-row md:items-center lg:gap-6">
              <Link
                href="/map"
                target="_blank"
                rel="noreferrer nofollow"
                className="flex items-center gap-1.5 transition-colors hover:text-accent-primary"
              >
                <span className="text-accent-primary/50">&gt;</span> Ecosystem
                Map
              </Link>
              <Link
                href="https://near.org"
                target="_blank"
                rel="noreferrer nofollow"
                className="flex items-center gap-1.5 transition-colors hover:text-accent-primary"
              >
                <span className="text-accent-primary/50">&gt;</span> near.org
              </Link>
              <Link
                href="https://near.foundation"
                target="_blank"
                rel="noreferrer nofollow"
                className="flex items-center gap-1.5 transition-colors hover:text-accent-primary"
              >
                <span className="text-accent-primary/50">&gt;</span> foundation
              </Link>
              <Link
                href="https://docs.nearcatalog.xyz"
                target="_blank"
                className="flex items-center gap-1.5 transition-colors hover:text-accent-primary"
              >
                <span className="text-accent-primary/50">&gt;</span> api_docs
              </Link>
              <Link
                href="/llms.txt"
                className="flex items-center gap-1.5 transition-colors hover:text-accent-primary"
              >
                <span className="text-accent-primary/50">&gt;</span> llms.txt
              </Link>
            </div>

            <div className="flex gap-6 text-white/40">
              <Link
                className="transition-all duration-300 hover:-translate-y-1 hover:text-accent-primary"
                href="https://x.com/nearcatalog"
                target="_blank"
                aria-label="X"
                rel="noreferrer nofollow"
              >
                <i className="bi bi-twitter-x text-lg" />
              </Link>
              <Link
                className="transition-all duration-300 hover:-translate-y-1 hover:text-accent-primary"
                href="https://github.com/nearcatalog"
                target="_blank"
                aria-label="Github"
                rel="noreferrer nofollow"
              >
                <i className="bi bi-github text-lg" />
              </Link>
              <Link
                className="transition-all duration-300 hover:-translate-y-1 hover:text-accent-primary"
                href="https://t.me/nearcatalogchat"
                target="_blank"
                aria-label="Telegram"
                rel="noreferrer nofollow"
              >
                <i className="bi bi-telegram text-lg" />
              </Link>
            </div>

            <div
              id="policies"
              className="cyber-mono flex gap-4 text-[9px] uppercase tracking-wider opacity-60"
            >
              <Link
                href="/policy/cookies"
                className="transition-colors hover:text-white"
              >
                Cookies
              </Link>
              <span className="text-white/20">|</span>
              <Link
                href="/policy/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy
              </Link>
              <span className="text-white/20">|</span>
              <Link
                href="/policy/tos"
                className="transition-colors hover:text-white"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-6 border-t border-white/5 pt-10 md:items-center">
          <Link
            href="/"
            className="group flex items-center gap-3 font-heading text-lg font-bold uppercase tracking-widest text-white"
          >
            <div className="rounded-[6px] border border-white/10 bg-white/5 p-1.5 transition-colors group-hover:border-accent-primary/50">
              <span className="material-symbols-outlined block text-sm text-accent-primary">
                Near Catalog
              </span>
            </div>
          </Link>
          <p className="cyber-mono max-w-2xl text-center text-[10px] uppercase leading-relaxed tracking-[0.1em] opacity-80">
            Powered by the NEAR Community. NEAR Catalog is made possible by the
            community of NEAR China, NEAR Vietnam Hub, NEAR Banyan, Build DAO
            and you 🫵😍•{" "}
            <a
              href="https://submit.nearcatalog.xyz"
              className="transition-colors hover:text-accent-primary"
            >
              [Submit Project]
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
