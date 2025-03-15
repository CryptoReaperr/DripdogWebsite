import { Route, Switch } from 'wouter';
import Team from './components/Team';
import Community from './components/Community';
import Roadmap from './components/Roadmap';
import { Home } from '@/components/Home';

const App = () => {
  return (
    <div className="app-container">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/team" component={Team} />
        <Route path="/community" component={Community} />
        <Route path="/roadmap" component={Roadmap} />
      </Switch>
    </div>
  );
};

export default App;