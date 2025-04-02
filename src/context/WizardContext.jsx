import { createContext, useContext, useReducer } from 'react';

// Initial state for the wizard
const initialState = {
  step: 0,
  agentType: null,
  mission: null,
  attacks: [],
  generatedContent: null,
  isGenerating: false,
  error: null
};

// Action types
export const ACTIONS = {
  SET_STEP: 'SET_STEP',
  SELECT_AGENT_TYPE: 'SELECT_AGENT_TYPE',
  SELECT_MISSION: 'SELECT_MISSION',
  SELECT_ATTACKS: 'SELECT_ATTACKS',
  START_GENERATING: 'START_GENERATING',
  SET_GENERATED_CONTENT: 'SET_GENERATED_CONTENT',
  SET_ERROR: 'SET_ERROR',
  RESET: 'RESET'
};

// Reducer function to handle state updates
function wizardReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_STEP:
      return { ...state, step: action.payload };
    case ACTIONS.SELECT_AGENT_TYPE:
      // When changing agent type, reset mission and attacks
      return { 
        ...state, 
        agentType: action.payload,
        mission: null,
        attacks: []
      };
    case ACTIONS.SELECT_MISSION:
      return { ...state, mission: action.payload };
    case ACTIONS.SELECT_ATTACKS:
      return { ...state, attacks: action.payload };
    case ACTIONS.START_GENERATING:
      return { ...state, isGenerating: true, error: null };
    case ACTIONS.SET_GENERATED_CONTENT:
      return { 
        ...state, 
        generatedContent: action.payload,
        isGenerating: false 
      };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isGenerating: false };
    case ACTIONS.RESET:
      return { ...initialState };
    default:
      return state;
  }
}

// Create context
const WizardContext = createContext();

// Provider component
export function WizardProvider({ children }) {
  const [state, dispatch] = useReducer(wizardReducer, initialState);
  
  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      {children}
    </WizardContext.Provider>
  );
}

// Custom hook to use the wizard context
export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}
