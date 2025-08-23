import { Code } from "lucide-react";
const Footer = () => {
  return (
    <>
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-card-foreground">
                  CompHub
                </span>
              </div>
              <p className="text-muted-foreground">
                Your gateway to competitive programming and hackathons
                worldwide.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-card-foreground mb-4">
                Competitions
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Programming Contests
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Hackathons
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-card-foreground mb-4">
                Community
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Forums
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Leaderboards
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-card-foreground mb-4">
                Support
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 CompHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
